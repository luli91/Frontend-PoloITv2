// src/pages/dashboard/DashboardHome.jsx
import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

const DashboardHome = () => {
    const [data] = useState([
        {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500 text-white',
            style: { borderRadius: '12px' },
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Ignacio',
                title: 'Mentor'
            },
            children: [
                {
                    type: 'person',
                    className: 'bg-blue-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Alfredo',
                        title: 'FullStack / Analista'
                    }
                },
                {
                    type: 'person',
                    className: 'bg-pink-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'María Soledad',
                        title: 'UX / Tester'
                    }
                },
                {
                    type: 'person',
                    className: 'bg-teal-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png',
                        name: 'Cyntia',
                        title: 'Frontend'
                    }
                },
                {
                    type: 'person',
                    className: 'bg-purple-500 text-white',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png',
                        name: 'Helga',
                        title: 'Backend'
                    }
                }
            ]
        }
    ]);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div style={{ textAlign: 'center' }}>
                    <img
                        alt={node.data.name}
                        src={node.data.image}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            marginBottom: '8px',
                            border: '2px solid white',
                            boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                        }}
                    />
                    <div
                        style={{
                            backgroundColor: 'white',
                            color: '#1f2937', // gris oscuro
                            padding: '6px 12px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            display: 'inline-block'
                        }}
                    >
                        <div style={{ fontWeight: 600 }}>{node.data.name}</div>
                        <div style={{ fontSize: '0.85rem' }}>{node.data.title}</div>
                    </div>
                </div>
            );
        }

        // para nodos de texto (no persona)
        return (
            <div
                style={{
                    backgroundColor: 'white',
                    color: '#1f2937',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    display: 'inline-block'
                }}
            >
                {node.label}
            </div>
        );
    };


    return (
        <div className="card overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Equipo Polo IT</h2>
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div>
    );
};

export default DashboardHome;
