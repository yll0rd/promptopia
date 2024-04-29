import {Schema, model, models, Document, Model} from "mongoose";
import {UserType} from "@/models/user";

export interface PromptType extends Document {
    creator: Document<UserType>['_id'];
    prompt: string;
    tag: string;
}

const PromptSchema = new Schema<PromptType>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
})

const Prompt = models.Prompt as Model<PromptType> || model<PromptType>('Prompt', PromptSchema);

export default Prompt;