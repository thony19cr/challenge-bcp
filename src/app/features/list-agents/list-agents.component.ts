import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentsService } from '../../core/services/agents.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Agent } from 'src/app/core/interfaces/agent';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-agents',
  templateUrl: './list-agents.component.html',
  styleUrls: ['./list-agents.component.css']
})
export class ListAgentsComponent implements OnInit {
  activeloadingfull = true;
  loading: boolean;
  agents: Agent[] = [];
  displayedColumns: string[] = [];
  
  dataSource = null;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private agentService: AgentsService, public dialog: MatDialog, private router: Router,) { 

    this.loading = true;
    this.displayedColumns = ['nombre', 'departamento', 'direccion'];
  }

  dataAgents: Array<any> = [];

  ngOnInit(): void {
    this.initData()
    this.activeloadingfull = false;
  }

  initData(){
    this.dataAgents = JSON.parse(localStorage.getItem('agents'));
    this.setDataSource()
  }

  setDataSource(){
    this.dataSource = new MatTableDataSource(this.dataAgents);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAgent(agents: Agent){
    this.router.navigate(['/editAgent'])
  }
}
