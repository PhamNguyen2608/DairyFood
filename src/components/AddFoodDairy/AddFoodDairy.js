const addFoodDairy = async (food) => {
  try {
    const response = await fetch(
      "https://641474f736020cecfda920f8.mockapi.io/api/v1/dairyFood",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
      }
    );

    if (!response.ok) {
      throw new Error("Add food failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

