import { deviceWidth, nextFreeChannel, uniqueName } from "../model";
import type { DeviceConfig, NodeConfig, UiConfig, UniverseConfig } from "../types";

export const clone = <T>(value: T): T => structuredClone(value);

export const allNames = (config: UiConfig): string[] =>
  config.nodes.flatMap((node) =>
    node.universes.flatMap((universe) => universe.devices.map((device) => device.name))
  );

export const newUniverse = (node: NodeConfig): UniverseConfig => ({
  id: node.universes.length ? Math.max(...node.universes.map((u) => u.id)) + 1 : 0,
  send_partial_universe: true,
  devices: []
});

export const newNode = (): NodeConfig => ({
  host: "",
  node_type: "artnet-direct",
  max_fps: 25,
  universes: [newUniverse({ host: "", universes: [] })]
});

export const newDevice = (config: UiConfig, universe: UniverseConfig): DeviceConfig => {
  const device: DeviceConfig = { channel: 1, name: uniqueName("light_1", allNames(config)), type: "dimmer" };
  device.channel = nextFreeChannel(universe, deviceWidth(device));
  return device;
};

export const duplicateDevice = (
  config: UiConfig,
  universe: UniverseConfig,
  device: DeviceConfig
): DeviceConfig => {
  const copy = clone(device);
  copy.name = uniqueName(device.name, allNames(config));
  delete copy.friendly_name;
  copy.channel = nextFreeChannel(universe, deviceWidth(copy));
  return copy;
};

export const duplicateUniverse = (
  config: UiConfig,
  node: NodeConfig,
  universe: UniverseConfig
): UniverseConfig => {
  const copy = clone(universe);
  copy.id = newUniverse(node).id;
  const names = allNames(config);
  for (const device of copy.devices) {
    device.name = uniqueName(device.name, names);
    delete device.friendly_name;
    names.push(device.name);
  }
  return copy;
};

export const moveItem = <T>(list: T[], from: number, to: number) => {
  if (to < 0 || to >= list.length) return;
  const [item] = list.splice(from, 1);
  list.splice(to, 0, item);
};
