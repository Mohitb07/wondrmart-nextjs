import { AddressFormData } from "@/types";
import axios from "axios";

export async function POST(request: Request) {
  const cookie = request.headers.get("Cookie")?.split("=")[1];
  const formData = await request.formData();
  const body: AddressFormData = {
    name: JSON.parse(formData.get("name") as string),
    mobile: JSON.parse(formData.get("mobile") as string),
    pinCode: JSON.parse(formData.get("pinCode") as string),
    country: JSON.parse(formData.get("country") as string),
    state: JSON.parse(formData.get("state") as string),
    city: JSON.parse(formData.get("city") as string),
    area: JSON.parse(formData.get("area") as string),
    apartment: JSON.parse(formData.get("apartment") as string),
    isDefault: JSON.parse(formData.get("isDefault") as string),
  };
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/create_address`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    return new Response(JSON.stringify(res.data), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        });
      }
    }

    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}

export async function PATCH(request: Request) {
  const cookie = request.headers.get("Cookie")?.split("=")[1];
  const addressId = request.headers.get("id");
  const formData = await request.formData();
  const body: AddressFormData = {
    name: JSON.parse(formData.get("name") as string),
    mobile: JSON.parse(formData.get("mobile") as string),
    pinCode: JSON.parse(formData.get("pinCode") as string),
    country: JSON.parse(formData.get("country") as string),
    state: JSON.parse(formData.get("state") as string),
    city: JSON.parse(formData.get("city") as string),
    area: JSON.parse(formData.get("area") as string),
    apartment: JSON.parse(formData.get("apartment") as string),
    isDefault: JSON.parse(formData.get("isDefault") as string),
  };

  try {
    const res = await axios.patch(
      `${process.env.BASE_URL}/update_address/${addressId}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    return new Response(JSON.stringify(res.data), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        });
      }
    }

    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}

export async function GET(request: Request) {
  const cookie = request.headers.get("Cookie")?.split("=")[1];
  const id = request.headers.get("id");

  try {
    const res = await axios.get(`${process.env.BASE_URL}/address/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        });
      }
    }

    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
