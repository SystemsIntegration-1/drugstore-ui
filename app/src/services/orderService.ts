export const createOrder = async (order: { productQuantities: Record<string, number>; totalPrice: number }) => {
    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }
  
      const data = await response.json();
      console.log("Orden creada:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  