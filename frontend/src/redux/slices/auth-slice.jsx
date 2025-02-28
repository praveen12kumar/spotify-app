import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || "",
};


export const register = createAsyncThunk( "auth/register", async (data , { rejectWithValue }) => {

  const formData = new FormData();
  formData.append("username", data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('avatar', data.avatar);

  try {
      const response = axiosInstance.post("/signup", formData,{
        headers:
          { "Content-Type": "multipart/form-data" },
        });
      
      await toast.promise(response, {
        loading: "Wait! Creating your account...",
        success: (res) => res.data?.message || "Account created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create account",
      });
      
      return (await response).data;
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      return rejectWithValue(error?.response?.data || { message: "Error" });
    }
  }
);
//------------------Login-----------------

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post("/login", data);
    await toast.promise(response,{
      loading: "Wait! Logging in...",
      success: (res) => res.data?.message || "Logged in successfully!",
      error: (err) => err?.response?.data?.message || "Failed to login",
    });
    //console.log("response", await response);
    return (await response).data;

  } catch (error) {
     toast.error(error?.response?.data?.message || "An error occurred");
    return rejectWithValue(error?.response?.data || { message: "Error" });
  }
})

//--------------------Verify Email-------------
export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (data, { rejectWithValue }) => {
  console.log("data", data);
  
  try {
    const response = axiosInstance.post("/verify-email", { code: data });
    await toast.promise(response, {
      loading: "Wait! Verifying email...",
      success: (res) => res.data?.message || "Email verified successfully!",
      error: (err) => err?.response?.data?.message || "Failed to verify email",
    })

    console.log("response", await response);
    return (await response).data;

  } 
  catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
   return rejectWithValue(error?.response?.data || { message: "Error" });
 }
})


//-----------------Logout-----------------
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post("/logout");
    await toast.promise(response, {
      loading: "Wait! Logging out...",
      success: (res) => res.data?.message || "Logged out successfully!",
      error: (err) => err?.response?.data?.message || "Failed to logout",
    });
    return (await response).data;
  } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
      }
})

//--------------------get user details

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = axiosInstance.get("/users");
    await toast.promise(response, {
      loading: "Wait! Fetching user details...",
      success: "User details fetched successfully",
      error: "Something went wrong",
    });
    console.log("response", await response);
    return (await response).data;

  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    return rejectWithValue(error?.response?.data || { message: "Error" });
  }
} 
)

//---------------update user profile


export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (data, { rejectWithValue }) => {
 
  const formdata = new FormData();
  formdata.append("username", data.username);
  formdata.append("avatar", data.avatar);
  
   try {
     const response = axiosInstance.put("/users/update-profile", formdata, {
       headers: { "Content-Type": "multipart/form-data" },
     });

     await toast.promise(response, {
       loading: "Wait! Updating user profile...",
       success: "User profile updated successfully",
       error: "Something went wrong",
     });
     return (await response).data;

   } catch (error) {
     toast.error(error?.response?.data?.message || "An error occurred");
     return rejectWithValue(error?.response?.data || { message: "Error" });
   }
 } 
)




export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action?.payload?.data;
        state.isLoggedIn = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", action?.payload?.data?.role);
        state.user = action?.payload?.data;
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.role;
      })

      .addCase(verifyEmail.fulfilled, (state, action)=>{
        console.log(action);
        state.isLoggedIn = true;
        state.user = action?.payload?.data;
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        state.user = null;
        state.isLoggedIn = false;
        state.role = "";
      })

      .addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action?.payload?.data;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        //console.log("action", action);
        state.user = action?.payload?.data;
      })

      


  },
});


export default authSlice.reducer;
