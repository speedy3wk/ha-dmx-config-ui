"""Shared validation cases, also executed by the frontend tests (frontend/test)."""

import json
from pathlib import Path

import pytest

from custom_components.ha_artnet_led_uiconfig.model import normalize_config, validate_config

CASES = json.loads((Path(__file__).parent / "fixtures" / "validation_cases.json").read_text())


@pytest.mark.parametrize("case", CASES, ids=[case["name"] for case in CASES])
def test_validation_case(case: dict) -> None:
    issues = validate_config(normalize_config(case["config"]))
    assert [{"path": i["path"], "code": i["code"]} for i in issues] == case["expected"]
