// src/components/dashboard/SidebarSection.jsx
import React, { useMemo } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';

const SidebarSection = ({ item, activeIndex, onTabChange }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isSelected = (path) => location.pathname === path;

    if (!item.children) {
        return (
            <div
                className={classNames(
                    'p-3 rounded cursor-pointer transition-colors mb-2',
                    'hover:bg-gray-100',
                    {
                        'bg-gray-100 font-semibold': isSelected(item.path)
                    }
                )}
                onClick={() => navigate(item.path)}
            >
                <i className={`${item.icon} mr-2`} /> {item.label}
            </div>
        );
    }

    return (
        <Accordion activeIndex={activeIndex} onTabChange={onTabChange} multiple={false} className="mb-2">
            <AccordionTab header={<div className="flex items-center gap-2"><i className={item.icon} />{item.label}</div>}>
                <ul className="list-none p-0 m-0">
                    {item.children.map((subItem, i) => (
                        <li
                            key={i}
                            className={classNames(
                                'pl-5 py-2 pr-3 cursor-pointer hover:bg-gray-50 rounded transition-colors',
                                {
                                    'bg-gray-100 font-medium': isSelected(subItem.path)
                                }
                            )}
                            onClick={() => navigate(subItem.path)}
                        >
                            <i className={`${subItem.icon} mr-2`} /> {subItem.label}
                        </li>
                    ))}
                </ul>
            </AccordionTab>
        </Accordion>
    );
};

export default SidebarSection;