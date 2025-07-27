import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { districts } from "@/app/data/districts";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the import path based on your project structure

interface ProvFormProps {
  priv: boolean;
}

const ProvForm: React.FC<ProvFormProps> = ({ priv }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    responseTime: "",
    ownerName: "",
    yearsInBusiness: "",
    businessAddress: "",
    contactNumbers: "",
    rating: "",
    ratings: "",
    emergencyContactNumbers: "",
    emailId: "",
    panNumber: "",
    gstNumber: "",
    businessHours: "",
    serviceCities: [] as string[],
    attendantsAvailable: "",
    nursesAvailable: "",
    semiNursesAvailable: "",
    customersServed: "",
    attendant24HourShift: '',
    attendant12HourShift: '',
    attendant6HourShift: '',
    attendantDuration: '',
    nurse24HourShift: '',
    nurse12HourShift: '',
    nurse6HourShift: '',
    nurseDuration: '',
    semiNurse24HourShift: '',
    semiNurse12HourShift: '',
    semiNurse6HourShift: '',
    semiNurseDuration: '',
    servicesOffered: [] as string[],
    timeToReplace: '',
    description: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState(districts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredCities(
      districts.filter((city: string) =>
        city.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCitySelect = (city: string) => {
    if (!formData.serviceCities.includes(city)) {
      setFormData((prev) => ({
        ...prev,
        serviceCities: [...prev.serviceCities, city],
      }));
      setSearchTerm("");
      setFilteredCities(districts);
    }
  };

  const handleCityRemove = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceCities: prev.serviceCities.filter((item) => item !== city),
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(value)
        ? prev.servicesOffered.filter((s) => s !== value)
        : [...prev.servicesOffered, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "providers"), formData);
      setFormData({
        businessName: "",
        ownerName: "",
        yearsInBusiness: "",
        businessAddress: "",
        contactNumbers: "",
        emergencyContactNumbers: "",
        emailId: "",
        panNumber: "",
        gstNumber: "",
        businessHours: "",
        responseTime: "",
        rating: "",
        description: "",
        ratings: "",
        serviceCities: [],
        attendantsAvailable: "",
        nursesAvailable: "",
        semiNursesAvailable: "",
        customersServed: "",
        attendant24HourShift: '',
        nurse24HourShift: '',
        nurse12HourShift: '',
        nurse6HourShift: '',
        nurseDuration: '',
        attendant12HourShift: '',
        attendant6HourShift: '',
        attendantDuration: '',
        servicesOffered: [],
        timeToReplace: '',
        semiNurse24HourShift: '',
        semiNurse12HourShift: '',
        semiNurse6HourShift: '',
        semiNurseDuration: '',
      });

      // Notify the user of successful submission
      alert("Form submitted successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <Card className="max-w-7xl mx-auto p-8 shadow-lg rounded-2xl bg-white">
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Business Information */}
          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Business Name</Label>
            <Input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Business Owner's Name</Label>
            <Input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Owner's Name"
              required
            />
          </div>
          <div>
            <Label className="text-gray-700 font-medium">Years in Business</Label>
            <Input
              type="number"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              placeholder="Years"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Business Address</Label>
            <Input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="Business Address"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Contact Number(s)</Label>
            <Input
              type="text"
              name="contactNumbers"
              value={formData.contactNumbers}
              onChange={handleChange}
              placeholder="Enter numbers"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Emergency Contact Numbers (24x7)</Label>
            <Input
              type="text"
              name="emergencyContactNumbers"
              value={formData.emergencyContactNumbers}
              onChange={handleChange}
              placeholder="Emergency Contacts"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Business Email ID</Label>
            <Input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email ID"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Business PAN Number</Label>
            <Input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="PAN Number"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Business GST Number</Label>
            <Input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="GST Number"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Business Hours (for Customer Query)</Label>
            <Input
              type="text"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              placeholder="Business Hours"
              required
            />
          </div>

          {priv && (
            <>
              <div>
                <Label htmlFor="rating" className="block text-gray-700 font-medium">
                  Average Rating
                </Label>
                <Input
                  type="number"
                  id="rating"
                  step={0.1}
                  name="rating"
                  min="1"
                  max="5"
                  value={formData?.rating || ""}
                  placeholder="Average Rating"
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <Label htmlFor="ratings" className="block text-gray-700 font-medium">
                  No. of Ratings
                </Label>
                <Input
                  type="number"
                  id="ratings"
                  name="ratings"
                  value={formData?.ratings || ""}
                  placeholder="Number of Ratings"
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <div>
            <Label className="text-gray-700 font-medium">Response Time</Label>
            <Input
              type="text"
              name="responseTime"
              value={formData.responseTime}
              onChange={handleChange}
              placeholder="Response Time (mins)"
              required
            />
          </div>
            </>
          )}


          {/* Cities Where Service is Provided */}
          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Cities Where Service is Provided</Label>
            <div className="relative">
              <Input
                type="text"
                name="serviceCities"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Cities"
                className="p-2 border rounded-lg w-full"
              />
              {searchTerm && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-2 shadow-md z-10">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city: string) => (
                      <div
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
            {/* Display Selected Cities */}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.serviceCities.map((city) => (
                <div
                  key={city}
                  className="flex items-center bg-teal-100 text-teal-700 text-sm px-3 py-1 rounded-full"
                >
                  {city}
                  <button
                    type="button"
                    onClick={() => handleCityRemove(city)}
                    className="ml-2 text-teal-700 hover:text-teal-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Staffing Information */}
          <div>
            <Label className="text-gray-700 font-medium">Number of Attendants Available</Label>
            <Select onValueChange={(value) => handleSelectChange("attendantsAvailable", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["1-10", "11-30", "31-50", "51-100"].map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Number of Nurses Available</Label>
            <Select onValueChange={(value) => handleSelectChange("nursesAvailable", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["1-10", "11-30", "31-50", "51-100"].map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Number of Semi-Nurses Available</Label>
            <Select onValueChange={(value) => handleSelectChange("semiNursesAvailable", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["1-10", "11-30", "31-50", "51-100"].map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Customers Served in Last 3 Months</Label>
            <Select onValueChange={(value) => handleSelectChange("customersServed", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["Less than 50", "51-100", "101-300", "301-1000", "1000+"].map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attendant Charges */}
          <div>
            <Label className="text-gray-700 font-medium">Attendant Charges (for 24 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="attendant24HourShift"
              value={formData.attendant24HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Attendant Charges (for 12 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="attendant12HourShift"
              value={formData.attendant12HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Attendant Charges (for 6 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="attendant6HourShift"
              value={formData.attendant6HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          {/* Duration for which Attendant is Available */}
          <div>
            <Label className="text-gray-700 font-medium">Duration for which Attendant is Available</Label>
            <Select onValueChange={(value) => handleSelectChange("attendantDuration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["3 Days/Week", "5 Days/Week", "1 Week", "2 Weeks", "4 Weeks+"].map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nurse Charges */}
          <div>
            <Label className="text-gray-700 font-medium">Semi-Nurse Charges (for 24 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="semiNurse24HourShift"
              value={formData.semiNurse24HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Semi-Nurse Charges (for 12 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="semiNurse12HourShift"
              value={formData.semiNurse12HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Semi-Nurse Charges (for 6 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="semiNurse6HourShift"
              value={formData.semiNurse6HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          {/* Duration for which Attendant is Available */}
          <div>
            <Label className="text-gray-700 font-medium">Duration for which Semi-Nurse is Available</Label>
            <Select onValueChange={(value) => handleSelectChange("semiNurseDuration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["3 Days/Week", "5 Days/Week", "1 Week", "2 Weeks", "4 Weeks+"].map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          {/* Nurse Charges */}
          <div>
            <Label className="text-gray-700 font-medium">Nurse Charges (for 24 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="nurse24HourShift"
              value={formData.nurse24HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Nurse Charges (for 12 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="nurse12HourShift"
              value={formData.nurse12HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Nurse Charges (for 6 Hour Shift, for 30+ days)</Label>
            <Input
              type="text"
              name="nurse6HourShift"
              value={formData.nurse6HourShift}
              onChange={handleChange}
              placeholder="Enter charges"
              required
            />
          </div>

          {/* Duration for which Attendant is Available */}
          <div>
            <Label className="text-gray-700 font-medium">Duration for which Nurse is Available</Label>
            <Select onValueChange={(value) => handleSelectChange("nurseDuration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["3 Days/Week", "5 Days/Week", "1 Week", "2 Weeks", "4 Weeks+"].map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services Offered by Attendants */}
          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Services Offered by Attendants (other than Patient Care)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Grocery Buying",
                "Laundry",
                "Massage",
                "Washroom Cleaning",
                "Milk/Tea Preparation",
                "Cab Booking",
                "Help with Doctor Visits",
                "Emergency Services",
              ].map((service) => (
                <div
                  key={service}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.servicesOffered.includes(service)
                    ? "bg-teal-50 border-teal-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  onClick={() => handleCheckboxChange(service)}
                >
                  <input
                    type="checkbox"
                    id={service}
                    value={service}
                    checked={formData.servicesOffered.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="hidden"
                  />
                  <label htmlFor={service} className="text-sm text-gray-700">
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <Label className="text-gray-700 font-medium">Time to Provide Replacement</Label>
            <Select onValueChange={(value) => handleSelectChange("timeToReplace", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {["12 hours", "24 hours", "48 hours"].map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!priv &&(
            <div>
            <Label className="text-gray-700 font-medium">Time Required to provide nurses/attendants?</Label>
            <Input
              type="text"
              name="responseTime"
              value={formData.responseTime}
              onChange={handleChange}
              placeholder="Time Required"
              required
            />
          </div>
          )}

          
          <div className="md:col-span-2">
            <Label>Extra information you would like to add?</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-primary"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-teal-700 text-white rounded-lg py-3 hover:bg-teal-800"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProvForm;