import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const amenitiesList = [
  "Comfortable Accommodation",
  "Nutritious Meals",
  "Housekeeping & Laundry",
  "24/7 Medical Care",
  "Emergency Assistance",
  "Assisted Living Support",
  "Recreational Activities",
  "Yoga & Meditation",
  "Internet & Communication",
  "Visitor Lounge"
];

const ProviderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    providerName: "",
    address: "",
    phone: "",
    countryCode: "+91",
    rating: "",
    ratings: "",
    experience: "",
    norooms: "",
    staff: "",
    responseTime: "",
    trusted: "No",
    verified: "No",
    recentEnquiries: "",
    description: "",
    amenities: [] as string[],
    rooms: [] as Array<{
      name: string;
      price: number;
      space: number;
      people: number;
    }>,
  });

  const [currentRoom, setCurrentRoom] = useState({
    name: "",
    price: "",
    space: "",
    people: "",
  });

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

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleRoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRoom = () => {
    if (currentRoom.name && currentRoom.price && currentRoom.space && currentRoom.people) {
      setFormData((prev) => ({
        ...prev,
        rooms: [...prev.rooms, {
          name: currentRoom.name,
          price: Number(currentRoom.price),
          space: Number(currentRoom.space),
          people: Number(currentRoom.people),
        }],
      }));
      setCurrentRoom({ name: "", price: "", space: "", people: "" });
    }
  };

  const handleRemoveRoom = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "listings"), formData);
      alert("Provider submitted successfully!");
      setFormData({
        providerName: "",
        address: "",
        phone: "",
        countryCode: "+91",
        rating: "",
        ratings: "",
        experience: "",
        responseTime: "",
        trusted: "No",
        verified: "No",
        recentEnquiries: "",
        norooms: "",
        staff: "",
        description: "",
        amenities: [],
        rooms: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error submitting form");
    }
  };

  return (
    <Card className="max-w-7xl mx-auto p-8 shadow-lg rounded-2xl bg-white">
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="md:col-span-2">
            <Label>Provider Name</Label>
            <Input
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              placeholder="Provider Name"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label>Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full Address"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Country Code</Label>
              <Select
                value={formData.countryCode}
                onValueChange={(value) => handleSelectChange("countryCode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">+91 (India)</SelectItem>
                  {/* Add other country codes as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Phone Number</Label>
              <Input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div>
            <Label>Rating (1-5)</Label>
            <Input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Total Ratings</Label>
            <Input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Experience (Years)</Label>
            <Input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Response Time (minutes)</Label>
            <Input
              type="number"
              name="responseTime"
              value={formData.responseTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Trusted Provider</Label>
            <Select
              value={formData.trusted}
              onValueChange={(value) => handleSelectChange("trusted", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Verified Provider</Label>
            <Select
              value={formData.verified}
              onValueChange={(value) => handleSelectChange("verified", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Recent Enquiries</Label>
            <Input
              type="number"
              name="recentEnquiries"
              value={formData.recentEnquiries}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Staff</Label>
            <Input
              type="number"
              name="staff"
              value={formData.staff}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Number of Rooms</Label>
            <Input
              type="number"
              name="norooms"
              value={formData.norooms}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Amenities</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.amenities.includes(amenity)
                      ? "bg-teal-50 border-teal-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  onClick={() => handleAmenityChange(amenity)}
                >
                  <input
                    type="checkbox"
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="hidden"
                  />
                  <label htmlFor={amenity} className="text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="md:col-span-2">
            <Label className="text-gray-700 font-medium">Add Room Types</Label>
            <div className="grid grid-cols-4 gap-4">
              <Input
                placeholder="Room Name"
                name="name"
                value={currentRoom.name}
                onChange={handleRoomInputChange}
              />
              <Input
                placeholder="Price"
                type="number"
                name="price"
                value={currentRoom.price}
                onChange={handleRoomInputChange}
              />
              <Input
                placeholder="Space (sq ft)"
                type="number"
                name="space"
                value={currentRoom.space}
                onChange={handleRoomInputChange}
              />
              <Input
                placeholder="People"
                type="number"
                name="people"
                value={currentRoom.people}
                onChange={handleRoomInputChange}
              />
            </div>
            <Button
              type="button"
              onClick={handleAddRoom}
              className="mt-2"
              disabled={!currentRoom.name || !currentRoom.price || !currentRoom.space || !currentRoom.people}
            >
              Add Room
            </Button>

            <div className="mt-4 space-y-2">
              {formData.rooms.map((room, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 shadow-md text-teal-700 text-sm font-bold px-6 py-4 rounded-md">
                  <span>
                    {room.name} - {room.space} sq ft <br /> <br /> ₹{room.price}/month <br /> {room.people} people
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(index)}
                    className="ml-2 text-xl text-teal-700 hover:text-teal-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-teal-700 text-white hover:bg-teal-800">
              Submit Provider
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProviderForm;