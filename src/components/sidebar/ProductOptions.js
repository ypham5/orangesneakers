import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiHome, HiInbox, HiTag, HiUserGroup, HiChartBar, HiSpeakerphone, HiReceiptTax, HiGift, HiViewGridAdd, HiOfficeBuilding, HiQuestionMarkCircle } from 'react-icons/hi';


export const menuItems = [
    {
        name: "Home",
        to: "/dashboard",
        icon: <HiHome />,
    },
    {
        name: "Orders",
        to: `orders`,
        icon: <HiInbox />,
    },
    {
        name: "Products",
        to: "add",
        icon: <HiTag />,
    },
    {
        name: "Customers",
        to: `customers`,
        icon: <HiUserGroup />,
    },
    {
        name: "Analytics",
        to: `analytics`,
        icon: <HiChartBar />,
    },
    {
        name: "Marketing",
        to: `marketing`,
        icon: <HiSpeakerphone />,
    },
    {
        name: "Discounts",
        to: `discounts`,
        icon: <HiReceiptTax />,
    },
    {
        name: "Gift Cards",
        to: `giftcards`,
        icon: <HiGift />,
    },
    {
        name: "Apps",
        to: `apps`,
        icon: <HiViewGridAdd />,
    },
    {
        name: "Online Stores",
        to: `onlinestores`,
        icon: <HiOfficeBuilding />,
    },
    {
        name: "Getting Helps",
        to: `gettinghelps`,
        icon: <HiQuestionMarkCircle />,
    },

];
const ProductOptionStyles = styled.ul`

`;

function ProductOptions(props) {
    return (
        <ProductOptionStyles>
            {menuItems.map((menuItem, index) => (
                <li key={index} onClick={props.onClick}>
                <Link to={menuItem.to}>
                    <div className="menu-item">
                        <div className="menu-icon">
                            {menuItem.icon}
                        </div>
                        <span>
                            {menuItem.name}
                        </span>
                    </div>
                </Link>
                </li >
            ))}
        </ProductOptionStyles>
    )
}

export default ProductOptions