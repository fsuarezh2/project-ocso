import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()


export class EmployeesService {
  private employees = [
  {
    id:1,
    name:"alberto",
    lastname:"perez",
    phonenumber:"4432333323"
  },
  {
    id:2,
    name:"Juan",
    lastname:"rulfo",
    phonenumber:"4433354535"
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id===id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoupdate = this.findOne(id);
    employeetoupdate={
    ...employeetoupdate,
    ...updateEmployeeDto,
    }
    this.employees = this.employees.map((employee)=>{
      if (employee.id == id){
        employee = employee
      }
      return employee
    })
    return employeetoupdate;
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee)=> employee.id === id);
    return this.employees
  }
}
