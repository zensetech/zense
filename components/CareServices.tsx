
export const CareServices = () => {
    const careServices = [
      {
        category: 'Medical Care',
        services: [
          '24/7 Nursing Staff',
          'Regular Health Check-ups',
          'Emergency Response System',
          'Medication Management',
        ],
      },
      {
        category: 'Personal Care',
        services: [
          'Daily Assistance',
          'Grooming Services',
          'Laundry Services',
          'Dietary Planning',
        ],
      },
    ];
  
    return (
      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden text-black my-8">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6">Care Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careServices.map((service, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-4">{service.category}</h3>
                <ul className="space-y-2">
                  {service.services.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="text-green-500 mr-2">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  