import os
import tempfile
from pathlib import Path

_tmp = tempfile.TemporaryDirectory()
os.environ["PS_DATA_DIR"] = str(Path(_tmp.name) / "prompt-studio-test")
