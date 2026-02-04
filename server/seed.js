const { sequelize, User, Material } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
        name: 'Admin Corralon',
        email: 'admin@corralon.com',
        password: hashedPassword,
        role: 'admin'
    });

    const customerPassword = await bcrypt.hash('user123', 10);
    await User.create({
        name: 'Juan Perez',
        email: 'juan@gmail.com',
        password: customerPassword,
        role: 'customer'
    });

    const materials = [
        {
            name: 'Arena Fina',
            description: 'Arena lavada de río, ideal para revoques finos y terminaciones.',
            price: 15000,
            stock: 100,
            category: 'Áridos',
            image: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1000&auto=format&fit=crop'
        },
        {
            name: 'Piedra Partida 6-20',
            description: 'Piedra de cantera ideal para hormigón armado y contrapisos.',
            price: 22000,
            stock: 50,
            category: 'Áridos',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000&auto=format&fit=crop'
        },
        {
            name: 'Ladrillo Común',
            description: 'Ladrillo de barro cocido tradicional para mampostería.',
            price: 120,
            stock: 5000,
            category: 'Mampostería',
            image: 'https://images.unsplash.com/photo-1504198453319-5ce911baf2ea?q=80&w=1000&auto=format&fit=crop'
        },
        {
            name: 'Ladrillo Hueco 12x18x33',
            description: 'Ladrillo cerámico hueco para muros exteriores e interiores.',
            price: 450,
            stock: 2000,
            category: 'Mampostería',
            image: 'https://images.unsplash.com/photo-1565008576549-57568a4f245c?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    await Material.bulkCreate(materials);

    console.log('Database seeded!');
    process.exit();
}

seed();
