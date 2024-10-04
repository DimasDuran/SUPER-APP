const CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot", 
    "Pepper__bell___healthy", 
    "Potato___Early_blight", 
    "Potato___Late_blight", 
    "Potato___healthy", 
    "Tomato_Bacterial_spot", 
    "Tomato_Early_blight", 
    "Tomato_Late_blight", 
    "Tomato_Leaf_Mold", 
    "Tomato_Septoria_leaf_spot", 
    "Tomato_Spider_mites_Two_spotted_spider_mite", 
    "Tomato__Target_Spot", 
    "Tomato__Tomato_YellowLeaf__Curl_Virus", 
    "Tomato__Tomato_mosaic_virus", 
    "Tomato_healthy"
];

// Objeto de traducción
const TRANSLATIONS = {
    "Pepper__bell___Bacterial_spot": "Pimiento pimiento mancha bacteriana",
    "Pepper__bell___healthy": "Pimiento pimiento saludable",
    "Potato___Early_blight": "Papa tizón temprano",
    "Potato___Late_blight": "Papa tizón tardío",
    "Potato___healthy": "Papa saludable",
    "Tomato_Bacterial_spot": "Tomate mancha bacteriana",
    "Tomato_Early_blight": "Tomate tizón temprano",
    "Tomato_Late_blight": "Tomate tizón tardío",
    "Tomato_Leaf_Mold": "Tomate moho de hoja",
    "Tomato_Septoria_leaf_spot": "Tomate mancha de hoja de Septoria",
    "Tomato_Spider_mites_Two_spotted_spider_mite": "Tomate ácaro araña de dos manchas",
    "Tomato__Target_Spot": "Tomate mancha objetivo",
    "Tomato__Tomato_YellowLeaf__Curl_Virus": "Tomate virus de rizo de hoja amarilla",
    "Tomato__Tomato_mosaic_virus": "Tomate virus mosaico de tomate",
    "Tomato_healthy": "Tomate saludable"
};

// Función para traducir la clase
const translateClassName = (className) => {
    return TRANSLATIONS[className] || "Clase desconocida";
};

export default translateClassName