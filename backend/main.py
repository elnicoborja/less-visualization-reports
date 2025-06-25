# main.py
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
    df = pd.read_csv(file.file)
    preview = df.head().to_dict(orient="records")
    columns = df.columns.tolist()
    return {
        "columns": columns,
        "preview": preview,
        "rows": len(df)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn main:app --host=0.0.0.0 --port=8000
