import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

function CrearProducto() {
    const { user, token } = useContext(AppContext);
    const [formData, setFormData] = useState({
        nombre_es: '',
        nombre_ca: '',
        nombre_en: '',
        descripcion_es: '',
        descripcion_ca: '',
        descripcion_en: '',
        ingredientes_es: '',
        ingredientes_ca: '',
        ingredientes_en: '',
        precio: '',
        categoria: '',
        imagen: null,
        recomendada: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Subiendo imagen...');

        if (!formData.imagen) {
            console.error('No hay imagen seleccionada');
            return;
        }

        try {
            const rutaImagen = await subirImagen(formData.imagen);
            console.log('Ruta de la imagen:', rutaImagen);

            const productoData = {
                ...formData,
                imagen: rutaImagen,
                categoria_id: mapearCateg(formData.categoria),
            };
            await crearProducto(productoData);

            // Limpiar el formulario después de crear el producto
            setFormData({
                nombre_es: '',
                nombre_ca: '',
                nombre_en: '',
                descripcion_es: '',
                descripcion_ca: '',
                descripcion_en: '',
                ingredientes_es: '',
                ingredientes_ca: '',
                ingredientes_en: '',
                precio: '',
                categoria: '',
                imagen: null,
                recomendada: false,
            });

        } catch (err) {
            console.error('Error al subir la imagen', err);
        }
    };

    async function subirImagen(imagen) {
        const data = new FormData();
        data.append('imagen', imagen);

        const response = await fetch(`http://192.168.1.116:8000/api/productos/subirImagen`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data,
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        const result = await response.json();
        console.log('Respuesta del backend:', result);
        return result.ruta;
    }

    async function crearProducto(data) {
        const productData = {
            nombre_es: data.nombre_es,
            nombre_ca: data.nombre_ca,
            nombre_en: data.nombre_en,
            descripcion_es: data.descripcion_es,
            descripcion_ca: data.descripcion_ca,
            descripcion_en: data.descripcion_en,
            ingredientes_es: data.ingredientes_es,
            ingredientes_ca: data.ingredientes_ca,
            ingredientes_en: data.ingredientes_en,
            precio: data.precio,
            categoria: data.categoria,
            recomendada: data.recomendada,
            imagen: data.imagen,
            categoria_id: data.categoria_id,
        };

        console.log('Enviando producto:', productData);

        try {
            const response = await fetch(`http://192.168.1.116:8000/api/productos`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Error al crear el producto: ${response.status}`);
            }

            const result = await response.json();
            console.log('Producto creado correctamente', result);
        } catch (error) {
            console.error('Error al crear el producto', error);
        }
    }

    function mapearCateg(categoria) {
        switch (categoria) {
            case "Primeros":
                return 1;
            case "Segundos":
                return 2;
            case "Bebidas":
                return 3;
            case "Postres":
                return 4;
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat p-6">
            <h1 className="text-4xl font-bold italic text-center mb-8">
                Crear nuevo producto
            </h1>
            <form onSubmit={handleSubmit} className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl p-8 w-full max-w-3xl space-y-6">

                {["es", "ca", "en"].map((lang) => (
                    <input
                        key={`nombre_${lang}`}
                        name={`nombre_${lang}`}
                        placeholder={`Nombre (${lang})`}
                        value={formData[`nombre_${lang}`]}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
                        required
                    />
                ))}

                {["es", "ca", "en"].map((lang) => (
                    <textarea
                        key={`descripcion_${lang}`}
                        name={`descripcion_${lang}`}
                        placeholder={`Descripción (${lang})`}
                        value={formData[`descripcion_${lang}`]}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
                        rows={2}
                        required
                    />
                ))}

                {["es", "ca", "en"].map((lang) => (
                    <textarea
                        key={`ingredientes_${lang}`}
                        name={`ingredientes_${lang}`}
                        placeholder={`Ingredientes (${lang})`}
                        value={formData[`ingredientes_${lang}`]}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
                        rows={2}
                        required
                    />
                ))}

                <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    placeholder="Precio (€)"
                    step="0.01"
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
                    required
                />

                <label className="text-white text-sm font-bold mb-2 block text-left" htmlFor="categoria">
                    Categoría
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-blue-500 rounded text-white focus:outline-none focus:ring focus:border-blue-300"
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Primeros">Primeros</option>
                    <option value="Segundos">Segundos</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Postres">Postres</option>
                </select>

                <div>
                    <label className="block text-sm font-bold mb-2">Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="imagen"
                        onChange={handleChange}
                        className="w-full p-2 bg-transparent text-white"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="recomendada"
                        checked={formData.recomendada}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />
                    <label className="text-white">¿Producto recomendado?</label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-[#012340] font-bold py-3 rounded-xl hover:scale-105 transition-transform"
                >
                    Crear producto
                </button>
            </form>
        </div>
    );
}

export default CrearProducto;
