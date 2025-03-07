import Cart from "../components/Cart";

export default function CartPage() {
    return (
        <div style={styles.container}>
            <h1>🛒 Kosár</h1>
            <Cart />
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
    },
};
