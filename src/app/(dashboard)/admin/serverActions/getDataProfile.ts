"use server";

export async function getDataProfile(token: string) {
  const url = `${process.env.HOST}/api/v1/user/me`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}
