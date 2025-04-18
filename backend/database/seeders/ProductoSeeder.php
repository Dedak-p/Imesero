<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    public function run()
    {
        $productos = [
            // Primeros
            [
                'nombre'       => 'Ensalada de queso de cabra y frutos secos',
                'descripcion'  => 'Ensalada fresca con queso de cabra, nueces y vinagreta especial.',
                'ingredientes' => 'Queso de cabra, nueces, lechuga, vinagreta',
                'precio'       => 12.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/ensalada-de-queso-de-cabra-y-frutos-secos.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Salmón marinado con salsa tártara',
                'descripcion'  => 'Salmón fresco marinado acompañado de salsa tártara casera.',
                'ingredientes' => 'Salmón, salsa tártara, eneldo, limón',
                'precio'       => 14.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/salmon-marinado.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Canelones rustidos',
                'descripcion'  => 'Canelones caseros rellenos de carne rustida al horno.',
                'ingredientes' => 'Carne rustida, pasta de canelón, bechamel',
                'precio'       => 13.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/canelones.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Mejillones a la vinagreta',
                'descripcion'  => 'Mejillones frescos aliñados con vinagreta de verduras.',
                'ingredientes' => 'Mejillones, cebolla, pimiento, vinagre',
                'precio'       => 11.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/mejillones-a-la-vinagreta.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Cigalas salteadas',
                'descripcion'  => 'Cigalas salteadas al ajillo con un toque de limón.',
                'ingredientes' => 'Cigalas, ajo, perejil, limón',
                'precio'       => 16.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/cigalas-salteadas.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Chipirones fritos',
                'descripcion'  => 'Chipirones fritos crujientes acompañados de alioli.',
                'ingredientes' => 'Chipirones, harina, aceite, alioli',
                'precio'       => 12.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/chipirones.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Ensaladilla rusa con bonito',
                'descripcion'  => 'Ensaladilla clásica con bonito y mayonesa casera.',
                'ingredientes' => 'Patatas, zanahorias, guisantes, bonito, mayonesa',
                'precio'       => 10.00,
                'categoria'    => 'Primeros',
                'imagen'       => '/Imagenes/Menu/ensaladilla-rusa-bonito.jpg',
                'recomendada'  => false,
            ],

            // Segundos
            [
                'nombre'       => 'Arroz seco de la lonja',
                'descripcion'  => 'Arroz seco con marisco fresco de la lonja.',
                'ingredientes' => 'Arroz, marisco variado, fumet de pescado',
                'precio'       => 18.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/arroz-seco-lonja.jpg',
                'recomendada'  => true,
            ],
            [
                'nombre'       => 'Fideuá',
                'descripcion'  => 'Fideuá tradicional con alioli de acompañamiento.',
                'ingredientes' => 'Fideos, sepia, marisco, fumet',
                'precio'       => 17.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/fideua.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Butifarra casera de setas',
                'descripcion'  => 'Butifarra artesana con setas salteadas.',
                'ingredientes' => 'Butifarra, setas variadas, ajo, perejil',
                'precio'       => 15.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/butifarra.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Timbal de langostino con allioli',
                'descripcion'  => 'Timbal de langostino fresco con suave alioli casero.',
                'ingredientes' => 'Langostinos, patata, alioli',
                'precio'       => 16.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/timball.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Calamar nacional a la plancha',
                'descripcion'  => 'Calamar nacional a la plancha con aceite de oliva virgen.',
                'ingredientes' => 'Calamar, aceite de oliva, ajo, perejil',
                'precio'       => 18.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/calamar-nacional.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Merluza de palangre a la plancha',
                'descripcion'  => 'Merluza de palangre cocinada a la plancha con verduras.',
                'ingredientes' => 'Merluza, verduras variadas, aceite de oliva',
                'precio'       => 20.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/merluza-plancha.jpeg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Osobuco al vino del Priorat',
                'descripcion'  => 'Tierna carne de osobuco cocida lentamente al vino tinto.',
                'ingredientes' => 'Osobuco, vino tinto Priorat, verduras',
                'precio'       => 22.00,
                'categoria'    => 'Segundos',
                'imagen'       => '/Imagenes/Menu/osobuco.jpg',
                'recomendada'  => false,
            ],

            // Bebidas
            [
                'nombre'       => 'Vino',
                'descripcion'  => 'Copa de vino tinto o blanco a elección.',
                'ingredientes' => 'Uvas seleccionadas',
                'precio'       => 3.00,
                'categoria'    => 'Bebidas',
                'imagen'       => '/Imagenes/Menu/vino.jpeg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Agua',
                'descripcion'  => 'Botella de agua mineral natural.',
                'ingredientes' => 'Agua mineral',
                'precio'       => 2.00,
                'categoria'    => 'Bebidas',
                'imagen'       => '/Imagenes/Menu/agua.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Cerveza',
                'descripcion'  => 'Cerveza fría servida en copa.',
                'ingredientes' => 'Cebada, lúpulo, levadura, agua',
                'precio'       => 3.00,
                'categoria'    => 'Bebidas',
                'imagen'       => '/Imagenes/Menu/cerveza.jpg',
                'recomendada'  => true,
            ],

            // Postres
            [
                'nombre'       => 'Tarta de queso',
                'descripcion'  => 'Tarta de queso cremosa al horno.',
                'ingredientes' => 'Queso crema, galletas, mantequilla, azúcar',
                'precio'       => 5.00,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/tarta-queso.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Tarta Sacher',
                'descripcion'  => 'Clásica tarta Sacher con cobertura de chocolate.',
                'ingredientes' => 'Chocolate, harina, azúcar, huevos, mermelada de albaricoque',
                'precio'       => 5.50,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/tarta-sacher.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Crema catalana',
                'descripcion'  => 'Postre tradicional catalán con caramelo quemado.',
                'ingredientes' => 'Leche, azúcar, huevo, canela, limón',
                'precio'       => 4.50,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/crema-catalana.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Pudding de la casa con nata',
                'descripcion'  => 'Pudding casero servido con nata montada.',
                'ingredientes' => 'Leche, huevos, azúcar, nata',
                'precio'       => 4.00,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/pudding.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Fresas con nata',
                'descripcion'  => 'Fresas frescas con nata montada.',
                'ingredientes' => 'Fresas, nata montada',
                'precio'       => 4.50,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/fresas.jpg',
                'recomendada'  => false,
            ],
            [
                'nombre'       => 'Helado de vainilla',
                'descripcion'  => 'Helado artesanal de vainilla.',
                'ingredientes' => 'Leche, nata, vainilla, azúcar',
                'precio'       => 4.00,
                'categoria'    => 'Postres',
                'imagen'       => '/Imagenes/Menu/helado-vainilla.jpg',
                'recomendada'  => false,
            ],
        ];

        foreach ($productos as $item) {
            $cat = Categoria::firstOrCreate(
                ['nombre' => $item['categoria']],
                ['nombre' => $item['categoria']]
            );

            Producto::updateOrCreate(
                ['nombre' => $item['nombre']],
                [
                    'categoria_id' => $cat->id,
                    'imagen'       => $item['imagen'],
                    'descripcion'  => $item['descripcion'],
                    'ingredientes' => $item['ingredientes'],
                    'precio'       => $item['precio'],
                    'disponible'   => true,
                    'recomendada'  => $item['recomendada'],
                ]
            );
        }
    }
}
