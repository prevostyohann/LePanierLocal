import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyAppNav from "./Nav";

const TraderShop = () => {
    const { traderId } = useParams(); // Récupérer le trader_id depuis l'URL
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!traderId) {
            setError("Aucun trader sélectionné.");
            return;
        }

        axios.get(`http://localhost:8000/products/trader/${traderId}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                setError("Impossible de charger les produits.");
                console.error(error);
            });
    }, [traderId]);

    return (
        <div>
        <MyAppNav/>
            <h2>{traderId}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}€
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TraderShop;
