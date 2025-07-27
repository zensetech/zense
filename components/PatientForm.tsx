import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const PatientForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    generalCondition: "",
    medicalCondition: [] as string[],
    periodicInjections: "",
    serviceShift: "",
    contactNumber: "",
    city: "",
    email: "",
  });

  const [otherMedicalConditionText, setOtherMedicalConditionText] =
    useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => {
      const prevConditions = prevState[
        name as keyof typeof formData
      ] as string[];
      if (checked) {
        return {
          ...prevState,
          [name]: [...prevConditions, value],
        };
      } else {
        // If "Other" is unchecked, clear the other text input as well
        if (value === "Other") {
          setOtherMedicalConditionText("");
        }
        return {
          ...prevState,
          [name]: prevConditions.filter((condition) => condition !== value),
        };
      }
    });
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherMedicalConditionText(e.target.value);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: prevState[name as keyof typeof formData] === value ? "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };

    // If "Other" is selected and text is provided, add it to the medical conditions
    if (
      dataToSubmit.medicalCondition.includes("Other") &&
      otherMedicalConditionText.trim() !== ""
    ) {
      dataToSubmit.medicalCondition = dataToSubmit.medicalCondition.filter(
        (condition) => condition !== "Other"
      ); // Remove the generic "Other" entry
      dataToSubmit.medicalCondition.push(
        `Other: ${otherMedicalConditionText.trim()}`
      );
    } else if (
      dataToSubmit.medicalCondition.includes("Other") &&
      otherMedicalConditionText.trim() === ""
    ) {
      // If "Other" is selected but no text is provided, remove the generic "Other" entry
      dataToSubmit.medicalCondition = dataToSubmit.medicalCondition.filter(
        (condition) => condition !== "Other"
      );
    }

    try {
      await addDoc(collection(db, "patientSubmissions"), dataToSubmit);
      console.log("Form submitted successfully!");
      // Clear form after submission
      setFormData({
        patientName: "",
        patientAge: "",
        patientGender: "",
        generalCondition: "",
        medicalCondition: [],
        periodicInjections: "",
        serviceShift: "",
        contactNumber: "",
        city: "", // Add city here
        email: "",
      });
      setOtherMedicalConditionText(""); // Clear the other text state
      toast({
        title: "Form Submitted",
        description:
          "Thank You for sharing your details! We're here to help and will reach out to you ASAP!",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "Error submitting form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="patientName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name of Patient
        </label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          required
          pattern="^[a-zA-Z\s]*$"
          title="Only characters are allowed"
        />
      </div>
      <div>
        <label
          htmlFor="patientAge"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Patients age
        </label>
        <input
          type=""
          id="patientAge"
          name="patientAge"
          value={formData.patientAge}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          required
        />
      </div>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Patients gender
        </legend>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="patientGender"
              value="Male"
              checked={formData.patientGender === "Male"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="male"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="female"
              name="patientGender"
              value="Female"
              checked={formData.patientGender === "Female"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="female"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
      </fieldset>
      <div>
        <label
          htmlFor="contactNumber"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contact Number
        </label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Patient's general condition
        </legend>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="conscious"
              name="generalCondition"
              value="Conscious"
              checked={formData.generalCondition === "Conscious"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="conscious"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Conscious
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="unconscious"
              name="generalCondition"
              value="Unconscious"
              checked={formData.generalCondition === "Unconscious"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="unconscious"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Unconscious
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="independentWalking"
              name="generalCondition"
              value="Independent walking"
              checked={formData.generalCondition === "Independent walking"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="independentWalking"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Independent walking
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="walkWithSupport"
              name="generalCondition"
              value="Walk with support"
              checked={formData.generalCondition === "Walk with support"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="walkWithSupport"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Walk with support
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="oxygenSupport"
              name="generalCondition"
              value="Oxygen support"
              checked={formData.generalCondition === "Oxygen support"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="oxygenSupport"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Oxygen support
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="needHelpBathing"
              name="generalCondition"
              value="Need help with bathing"
              checked={formData.generalCondition === "Need help with bathing"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="needHelpBathing"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Need help with bathing
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Patient's medical condition
        </legend>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="justOld"
              name="medicalCondition"
              value="Just old"
              checked={formData.medicalCondition.includes("Just old")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="justOld"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Just old
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="bedRidden"
              name="medicalCondition"
              value="Bed-ridden"
              checked={formData.medicalCondition.includes("Bed-ridden")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="bedRidden"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Bed-ridden
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="postSurgery"
              name="medicalCondition"
              value="Post surgery"
              checked={formData.medicalCondition.includes("Post surgery")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="postSurgery"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Post surgery
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stroke"
              name="medicalCondition"
              value="Stroke"
              checked={formData.medicalCondition.includes("Stroke")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="stroke"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Stroke
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="kneeHipReplacement"
              name="medicalCondition"
              value="Knee/Hip replacement"
              checked={formData.medicalCondition.includes(
                "Knee/Hip replacement"
              )}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="kneeHipReplacement"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Knee/Hip replacement
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="parkinsons"
              name="medicalCondition"
              value="Parkinson's"
              checked={formData.medicalCondition.includes("Parkinson's")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="parkinsons"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Parkinson's
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="palliative"
              name="medicalCondition"
              value="Palliative"
              checked={formData.medicalCondition.includes("Palliative")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="palliative"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Palliative
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cancer"
              name="medicalCondition"
              value="Cancer"
              checked={formData.medicalCondition.includes("Cancer")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="cancer"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Cancer
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="otherMedicalCondition"
              name="medicalCondition"
              value="Other"
              checked={formData.medicalCondition.includes("Other")}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="otherMedicalCondition"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Other
            </label>
          </div>
        </div>
        {formData.medicalCondition.includes("Other") && (
          <div className="mt-4">
            <label
              htmlFor="otherMedicalConditionInput"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Please specify:
            </label>
            <input
              type="text"
              id="otherMedicalConditionInput"
              name="otherMedicalConditionInput"
              value={otherMedicalConditionText}
              onChange={handleOtherInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>
        )}
      </fieldset>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Periodic injections to be administered?
        </legend>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="injectionsYes"
              name="periodicInjections"
              value="Yes"
              checked={formData.periodicInjections === "Yes"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="injectionsYes"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="injectionsNo"
              name="periodicInjections"
              value="No"
              checked={formData.periodicInjections === "No"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="injectionsNo"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              No
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          Service shift required?
        </legend>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="shiftLiveIn"
              name="serviceShift"
              value="24hrs"
              checked={formData.serviceShift === "24hrs"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="shiftLiveIn"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              24hrs
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="shift12hrs"
              name="serviceShift"
              value="12hrs"
              checked={formData.serviceShift === "12hrs"}
              onChange={handleRadioChange}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <label
              htmlFor="shift12hrs"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              12hrs
            </label>
          </div>
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
      >
        Find the Right Care
      </button>
    </form>
  );
};

export default PatientForm;
