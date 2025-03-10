import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from "uuid";
import { error } from 'console';
import { NotFoundError } from 'rxjs';
@Injectable()


export class EmployeesService {
  private employees = [
  {
    id:uuid(),
    name:"alberto",
    lastname:"perez",
    phonenumber:"4432333323"
  },
  {
    id:uuid(),
    name:"Juan",
    lastname:"rulfo",
    phonenumber:"4433354535"
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid()
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=>employee.id===id)[0];
    if (!employee) throw new NotFoundException();
    return employee;  
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoupdate = this.findOne(id);
    employeetoupdate={
    ...employeetoupdate,
    ...updateEmployeeDto,
    }

    if(employeetoupdate)throw new NotFoundException();

    this.employees = this.employees.map((employee)=>{
      if (employee.id == id){
        employee = employee
      }
      return employee
    })
    return employeetoupdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.employees = this.employees.filter((employee)=> employee.id === id);
    return this.employees
  }
}
