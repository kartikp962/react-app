import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

function Component2() {
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
    ],
  };

  // State to keep track of selected departments and sub-departments
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState([]);

  // ---------------------------------------------------------------------------------------------------------------

  // Toggle the expansion state of a sub-department
  const toggleSubDepartment = (subDepartmentId) => {
    setSelectedSubDepartments((prevSelectedSubDepartments) => {
      if (prevSelectedSubDepartments.includes(subDepartmentId)) {
        return prevSelectedSubDepartments.filter((id) => id !== subDepartmentId);
      } else {
        return [...prevSelectedSubDepartments, subDepartmentId];
      }
    });
  };
  
  // Check if all sub-departments of the parent department are selected
  //   const parentDepartment = departmentsData.find((deptData) =>
  //     deptData.sub_departments.includes(subDepartment)
  //   );
  //   if (
  //     parentDepartment &&
  //     parentDepartment.sub_departments.every((subDept) => selectedSubDepartments.includes(subDept))
  //   ) {
  //     setSelectedDepartments((prevSelectedDepartments) => [
  //       ...prevSelectedDepartments,
  //       parentDepartment.department,
  //     ]);
  //   }
  // };
  

  // Toggle the selection state of a department
  const toggleDepartment = (departmentId) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      if (prevSelectedDepartments.includes(departmentId)) {
        return prevSelectedDepartments.filter((id) => id !== departmentId);
      } else {
        const department = departmentsData.departments.find((dept) => dept.id === departmentId);
        const subDepartmentIds = department.sub_departments.map((subDept) => subDept.id);
        setSelectedSubDepartments((prevSelectedSubDepartments) => [
          ...prevSelectedSubDepartments,
          ...subDepartmentIds,
        ]);
        return [...prevSelectedDepartments, departmentId];
      }
    });
  };
  
  //   // Remove the parent department if any of its sub-departments are deselected
  //   const parentDepartment = departmentsData.find((deptData) => deptData.department === department);
  //   if (
  //     parentDepartment &&
  //     parentDepartment.sub_departments.some((subDept) => !selectedSubDepartments.includes(subDept))
  //   ) {
  //     setSelectedDepartments((prevSelectedDepartments) =>
  //       prevSelectedDepartments.filter((dept) => dept !== parentDepartment.department)
  //     );
  //   }
  // };
  
  // -------------------------------------------------------------------------------------------------------------

  // Check if all sub-departments of a department are selected
  const areAllSubDepartmentsSelected = (departmentId) => {
    const department = departmentsData.departments.find((dept) => dept.id === departmentId);
    const subDepartmentIds = department.sub_departments.map((subDept) => subDept.id);
    return subDepartmentIds.every((subDeptId) => selectedSubDepartments.includes(subDeptId));
  };

  // Check if a department is selected
  const isDepartmentSelected = (departmentId) => {
    return selectedDepartments.includes(departmentId);
  };

  return (
    <div>
      {departmentsData.departments.map((department) => (
        <div key={department.id}>
          <Checkbox
            // type="checkbox"
            checked={isDepartmentSelected(department.id)}
            onChange={() => toggleDepartment(department.id)}
          />
          <span>{department.name}</span>
          <ul style={{ listStyleType: 'none' }}>
            {department.sub_departments.map((subDepartment) => (
            <li key={subDepartment.id}>
              <Checkbox
                // type="checkbox"
                checked={selectedSubDepartments.includes(subDepartment.id)}
                onChange={() => toggleSubDepartment(subDepartment.id)}
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
