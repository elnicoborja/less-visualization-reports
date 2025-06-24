from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (Netlify) to send requests to backend (Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your Netlify domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Less Visualization Reports API"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    file_size = len(contents)
    filename = file.filename

    # Here you can parse/process/store the file
    # For now, we just respond with info
    return {
        "status": "success",
        "filename": filename,
        "size_bytes": file_size
    }
