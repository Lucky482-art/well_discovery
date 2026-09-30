import os
import json

base_path = "D:/Ai-powered offset well knowledge and detection"
datasets = [
    "Geophysical_Interpretations",
    "Well_technical_data",
    "WITSML Realtime drilling data"
]

def analyze_directory(path, max_depth=3, current_depth=0):
    if current_depth > max_depth:
        return {"type": "directory_truncated"}
    
    result = {}
    try:
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                result[item] = analyze_directory(item_path, max_depth, current_depth + 1)
            else:
                ext = os.path.splitext(item)[1].lower()
                size = os.path.getsize(item_path)
                result[item] = {"type": "file", "ext": ext, "size_bytes": size}
    except Exception as e:
        return {"error": str(e)}
    return result

if __name__ == "__main__":
    overview = {}
    for ds in datasets:
        ds_path = os.path.join(base_path, ds)
        print(f"Analyzing {ds}...")
        overview[ds] = analyze_directory(ds_path, max_depth=2)
        
    with open("dataset_overview.json", "w") as f:
        json.dump(overview, f, indent=2)
    print("Saved to dataset_overview.json")
