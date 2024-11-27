// src/utils/api.js
const apiKey = "i0mjsr1g8kFlAvEj";

export const saveContract = async (contract) => {
  const response = await fetch("https://api.shyft.to/endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(contract),
  });

  if (!response.ok) {
    throw new Error("Failed to save contract");
  }

  return response.json();
};

export const sendConfirmationEmail = async (contractId, party) => {
  const response = await fetch("https://api.shyft.to/send-confirmation-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ contractId, party }),
  });

  if (!response.ok) {
    throw new Error("Failed to send confirmation email");
  }

  return response.json();
};

export const checkConfirmations = async (contractId) => {
  const response = await fetch(
    `https://api.shyft.to/check-confirmations/${contractId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check confirmations");
  }

  return response.json();
};

export const updateContract = async (contract) => {
  const response = await fetch(`https://api.shyft.to/endpoint/${contract.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(contract),
  });

  if (!response.ok) {
    throw new Error("Failed to update contract");
  }

  return response.json();
};
