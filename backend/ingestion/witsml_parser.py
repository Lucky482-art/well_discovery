import os
from bs4 import BeautifulSoup

def parse_witsml_trajectory(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'xml')
    stations = soup.find_all('trajectoryStation')
    
    parsed_stations = []
    for st in stations:
        try:
            md = float(st.find('md').text) if st.find('md') else None
            tvd = float(st.find('tvd').text) if st.find('tvd') else None
            incl = float(st.find('incl').text) if st.find('incl') else None
            azi = float(st.find('azi').text) if st.find('azi') else None
            dispNs = float(st.find('dispNs').text) if st.find('dispNs') else None
            dispEw = float(st.find('dispEw').text) if st.find('dispEw') else None
            
            if md is not None:
                parsed_stations.append({
                    "measured_depth": md,
                    "true_vertical_depth": tvd,
                    "inclination": incl,
                    "azimuth": azi,
                    "northing": dispNs,
                    "easting": dispEw
                })
        except Exception as e:
            continue
            
    return parsed_stations
