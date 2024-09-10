// Obtener usuarios (GET)
export const fetchUsers = async () => {
    try {
      const response = await fetch("/models/userModel.php");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  
  // Insertar nuevo usuario (POST)
  export const addUser = async (userData) => {
    try {
      const response = await fetch("/models/userModel.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding user:", error);
      return { success: false };
    }
  };
  
  // Actualizar usuario (PUT)
  export const updateUser = async (userData) => {
    try {
      const response = await fetch("/models/userModel.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false };
    }
  };
  