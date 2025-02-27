import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
    items: any[];
};

// Charger les éléments du wishlist depuis localStorage
const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<any>) => {
            const product = action.payload;
            const index = state.items.findIndex((item) => item.id === product.id);

            if (index !== -1) {
                state.items.splice(index, 1); // Retirer l'élément
            } else {
                state.items.push(product); // Ajouter l'élément
            }

            // Mettre à jour localStorage après modification
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
