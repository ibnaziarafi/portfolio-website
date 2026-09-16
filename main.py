from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from data import initial_village_profile, village_properties


class GuestbookSubmission(BaseModel):
    name: str = Field(min_length=1)
    message: str = Field(min_length=1)


class GuestbookEntry(GuestbookSubmission):
    id: str
    timestamp: str


app = FastAPI(title="Village Portfolio API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

visitor_count = 142
guestbook: list[GuestbookEntry] = [
    GuestbookEntry(
        id="gb-1",
        name="Sarah Chen (Lead Engineer)",
        message="The Route Planner at the Village Merchant is impressive! Comparing Dijkstra, Min-Heap, and A* with PyVRP and OR-Tools is top-notch.",
        timestamp="2 hours ago",
    ),
    GuestbookEntry(
        id="gb-2",
        name="Marcus Brody",
        message="Loved testing the 2048 game at the Watch Cottage and reading about the ML move-learning roadmap. Great village layout!",
        timestamp="Yesterday",
    ),
]
guestbook_lock = Lock()


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "runtime": "Python + FastAPI",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }


@app.get("/api/profile")
def profile() -> dict[str, Any]:
    global visitor_count
    visitor_count += 1
    response = dict(initial_village_profile)
    response["stats"] = {**initial_village_profile["stats"], "villageVisitors": visitor_count}
    return response


@app.get("/api/properties")
def properties(category: str | None = None) -> dict[str, list[dict[str, Any]]]:
    if category and category != "all":
        return {"properties": [item for item in village_properties if item["category"] == category]}
    return {"properties": village_properties}


@app.get("/api/properties/{property_id}")
def property_detail(property_id: str) -> dict[str, dict[str, Any]]:
    property_item = next((item for item in village_properties if item["id"] == property_id), None)
    if property_item is None:
        raise HTTPException(status_code=404, detail="Property not found in village")
    return {"property": property_item}


@app.get("/api/guestbook")
def get_guestbook() -> dict[str, Any]:
    with guestbook_lock:
        return {"entries": guestbook, "total": len(guestbook)}


@app.post("/api/guestbook", status_code=201)
def add_guestbook_entry(submission: GuestbookSubmission) -> dict[str, Any]:
    entry = GuestbookEntry(
        id=f"gb-{int(datetime.now(timezone.utc).timestamp() * 1000)}",
        name=submission.name[:50],
        message=submission.message[:200],
        timestamp="Just now",
    )
    with guestbook_lock:
        guestbook.insert(0, entry)
    return {"success": True, "entry": entry}


dist_path = Path(__file__).parent / "dist"
if dist_path.exists():
    app.mount("/assets", StaticFiles(directory=dist_path / "assets"), name="assets")


@app.get("/{path:path}")
def spa_fallback(path: str) -> FileResponse:
    index_path = dist_path / "index.html"
    if not index_path.exists():
        raise HTTPException(status_code=404, detail="Frontend build not found. Run npm run build first.")
    return FileResponse(index_path)
