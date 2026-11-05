"""Shared structural normalization helpers for DMX configuration models."""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any


class ConfigFormatError(ValueError):
    """Raised when stored or received data has an invalid structure."""

    def __init__(self, path: list[str | int], message: str) -> None:
        super().__init__(f"{'.'.join(str(part) for part in path)}: {message}")
        self.path = path


def _opt_str(value: Any, path: list[str | int]) -> str | None:
    if value is None:
        return None
    if isinstance(value, (dict, list)):
        raise ConfigFormatError(path, "expected a string")
    text = str(value).strip()
    return text or None


def _opt_number(value: Any, path: list[str | int], *, integer: bool) -> int | float | None:
    if value is None or (isinstance(value, str) and not value.strip()):
        return None
    if isinstance(value, bool):
        raise ConfigFormatError(path, "expected a number")
    try:
        number = float(value)
    except (TypeError, ValueError) as err:
        raise ConfigFormatError(path, "expected a number") from err
    if number != number or number in (float("inf"), float("-inf")):
        raise ConfigFormatError(path, "expected a finite number")
    if integer or number.is_integer():
        return int(number)
    return number


def _opt_bool(value: Any, path: list[str | int]) -> bool | None:
    if value is None:
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, str) and value.lower() in ("true", "false"):
        return value.lower() == "true"
    raise ConfigFormatError(path, "expected a boolean")


def _compact(data: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in data.items() if value is not None}


def _as_list(value: Any, path: list[str | int]) -> list[Any]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ConfigFormatError(path, "expected a list")
    return value


def _as_dict(value: Any, path: list[str | int]) -> Mapping[str, Any]:
    if not isinstance(value, Mapping):
        raise ConfigFormatError(path, "expected an object")
    return value
