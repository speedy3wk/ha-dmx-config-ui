"""Shared validation cases, also executed by the frontend tests (frontend/test)."""

import json
from pathlib import Path

import pytest

from custom_components.dmx_config_ui.model_dmx import (
    normalize_config as normalize_dmx,
    validate_config as validate_dmx,
)

DMX_CASES = json.loads(
    (Path(__file__).parent / "fixtures" / "dmx_validation_cases.json").read_text()
)


@pytest.mark.parametrize("case", DMX_CASES, ids=[case["name"] for case in DMX_CASES])
def test_dmx_validation_case(case: dict) -> None:
    issues = validate_dmx(normalize_dmx(case["config"]), case["fixtures"])
    assert [
        {"path": i["path"], "code": i["code"], "severity": i["severity"]} for i in issues
    ] == case["expected"]
