import { Document, model, Model, Schema } from "mongoose";

interface Project extends Document {
  name: string;
  description: string;
  dueDate?: Date;
  budget: {
    amount: number;
    currency: string;
  };
  categories: string[];
  createdBy: string;
}

const projectSchema = new Schema<Project, Model<Project>>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    budget: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    categories: [
      {
        ref: "Category",
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    createdBy: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Project", projectSchema);
