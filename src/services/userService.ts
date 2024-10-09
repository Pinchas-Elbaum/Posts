import User, { IUser } from "../models/User";


export const createUser = async (userData: Partial<IUser>, departmentId: string): Promise<IUser> => {
    const user = new User({
        ...userData,
        department: departmentId
    });

    return await user.save()
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password").populate("department")
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find().select("-password").populate("department")
}

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password")
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id)
}

export const getUserByRole = async (role: "employee" | "manager"): Promise<IUser[]> => {
    return await User.find({ role }).select("-password");
};



