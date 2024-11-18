
import React from "react";
import { useForm } from "react-hook-form";

interface FormPreviewProps {
  schema: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  let parsedSchema;
  try {
    parsedSchema = JSON.parse(schema);
  } catch {
    return <div className="w-full md:w-1/2 p-4">Invalid JSON Schema</div>;
  }

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-bold mb-2">Form Preview</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {parsedSchema?.fields?.map((field: any) => (
          <div key={field.id} className="mb-4">
            <label className="block font-bold">{field.label}</label>
            <input
              className="w-full border p-2"
              type={field.type}
              {...register(field.id, { required: field.required })}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
