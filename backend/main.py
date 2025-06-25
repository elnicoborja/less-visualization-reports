# backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Less Visualization Reports API"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        preview = df.head().to_dict(orient="records")
        columns = df.columns.tolist()
        return {"columns": columns, "preview": preview, "rows": len(df)}
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": str(e)}
        )
