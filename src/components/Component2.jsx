import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';


// Hardcoded JSON data
const departmentsData = {
  departments: [
    {
      id: 1,
      name: 'customer_service',
      sub_departments: [
        { id: 11, name: 'support' },
        { id: 12, name: 'customer_success' }
      ],
    },
    {
      id: 2,
      name: 'design',
      sub_departments: [
        { id: 21, name: 'graphic_design' },
        { id: 22, name: 'product_design' },
        { id: 23, name: 'web_design' },
      ],
    },
  ]
};

function Component2() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // With the departments data, initialize the users state
    setDepartments(departmentsData.departments.map((department) => ({
      ...department,
      isChecked: false,
      sub_departments: department.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: false
      }))
    })));
  }, []);

  const handleDepartmentChange = (e) => {
    const { name, checked } = e.target;
    let tempUsers = departments.map((department) => ({
      ...department,
      isChecked: department.name === name ? checked : department.isChecked, // isChecked is updated only if the department is clicked
      sub_departments: department.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: department.name === name ? checked : subDepartment.isChecked // isChecked is updated for sub-departments when their parent department is clicked before
      }))
    }));
    setDepartments(tempUsers);
  };
  

  const handleSubDepartmentChange = (e, departmentName) => {
    const { name, checked } = e.target;
    let tempUsers = departments.map((department) => ({
      ...department,
      isChecked:
        department.name === departmentName &&
        department.sub_departments.every((subDepartment) =>
          subDepartment.name === name ? checked : subDepartment.isChecked
        ),
      sub_departments: department.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: subDepartment.name === name ? checked : subDepartment.isChecked
      }))
    }));
    setDepartments(tempUsers);
  };
  

  return (
    <div>
      {departments.map((department) => (
        <div key={department.id}>
          <Checkbox
            type="checkbox"
            name={department.name}
            checked={
              department.isChecked ||
              department.sub_departments.filter((subDepartment) => !subDepartment.isChecked)
                .length === 0
            }
            onChange={handleDepartmentChange}
          />
          <span>{department.name}</span>
          <ul style={{ listStyleType: 'none' }}>
            {department.sub_departments.map((subDepartment) => (
              <li key={subDepartment.id}>
                <Checkbox
                  type="checkbox"
                  name={subDepartment.name}
                  checked={subDepartment.isChecked}
                  onChange={(e) => handleSubDepartmentChange(e, department.name)}
                />
                <span>{subDepartment.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Component2;
