// src/components/NutritionTable.jsx
const NutritionTable = ({ nutrition }) => {
  const nutritionFields = [
    { key: 'calories', label: 'Calories' },
    { key: 'carbohydrateContent', label: 'Carbohydrates', unit: 'g' },
    { key: 'cholesterolContent', label: 'Cholesterol', unit: 'mg' },
    { key: 'fatContent', label: 'Fat', unit: 'g' },
    { key: 'fiberContent', label: 'Fiber', unit: 'g' },
    { key: 'proteinContent', label: 'Protein', unit: 'g' },
    { key: 'saturatedFatContent', label: 'Saturated Fat', unit: 'g' },
    { key: 'sodiumContent', label: 'Sodium', unit: 'mg' },
    { key: 'sugarContent', label: 'Sugar', unit: 'g' },
    { key: 'unsaturatedFatContent', label: 'Unsaturated Fat', unit: 'g' }
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nutrient</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {nutritionFields.map((field) => {
            // Extract the value and unit from the nutrition data
            const value = nutrition[field.key];
            let displayValue = 'N/A';
            
            if (value) {
              // If the value already contains the unit, use it as is
              if (typeof value === 'string' && value.includes(' ')) {
                displayValue = value;
              } else if (field.unit) {
                // Otherwise, add the unit
                displayValue = `${value} ${field.unit}`;
              } else {
                displayValue = value;
              }
            }
            
            return (
              <tr key={field.key}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{field.label}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {displayValue}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default NutritionTable