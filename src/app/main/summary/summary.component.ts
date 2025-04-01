import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  isMobile: boolean = window.innerWidth < 1024;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 1024;
  }

  summaryTasksDesktop = [
    { task : "Tasks Urgent",
      imgpath : "urgent.svg",
      class: "largeBox"
    },
    { task : "Tasks in Board",
      imgpath : "taskcount.svg",
      class: "smallBox"
    },
    { task : "Tasks To-do",
      imgpath : "todo.svg",
      class: "smallBox toDo"
    },
    { task : "Tasks in Progress",
      imgpath : "progresstasks.svg",
      class: "smallBox"
    },
    { task : "Awaiting Feedback",
      imgpath : "feedback.svg",
      class: "smallBox"
    },
    { task : "Tasks Done",
      imgpath : "taskdone.svg",
      class: "smallBox"
    },
  ]

  summaryTasksMobile = [
    { task : "Tasks Urgent",
      imgpath : "urgent.svg",
      class: "largeBox"
    },
    { task : "Tasks To-do",
      imgpath : "todo.svg",
      class: "smallBox toDo"
    },
    { task : "Tasks in Board",
      imgpath : "taskcount.svg",
      class: "smallBox"
    },
    { task : "Tasks in Progress",
      imgpath : "progresstasks.svg",
      class: "smallBox"
    },
    { task : "Awaiting Feedback",
      imgpath : "feedback.svg",
      class: "smallBox"
    },
    { task : "Tasks Done",
      imgpath : "taskdone.svg",
      class: "smallBox"
    },
  ]
}
