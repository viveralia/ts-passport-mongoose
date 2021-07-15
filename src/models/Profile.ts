import { Document, model, Model, Schema } from "mongoose";

interface IProfile extends Document {
  user: string;
  company: string;
  website: string;
  phone: string;
  email: string;
}

const profileSchema = new Schema<IProfile, Model<IProfile>>({
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Profile", profileSchema);
