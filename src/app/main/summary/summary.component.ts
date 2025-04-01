import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  isMobile: boolean = window.innerWidth < 1024;

  /**
   * Watch for window size change under 1024px, call funktion to swap array.object positions
   */
  @HostListener('window:resize', [])
  onResize() {
    const newIsMobile = window.innerWidth < 1024;
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.swapTasks(1, 2);
    }
  }

  summaryTasks = [
    { task: 'Tasks Urgent', imgpath: 'urgent', class: 'largeBox' },
    { task: 'Tasks in Board', imgpath: 'taskcount', class: 'smallBox' },
    { task: 'Tasks To-do', imgpath: 'todo', class: 'smallBox toDo' },
    {
      task: 'Tasks in Progress',
      imgpath: 'progresstasks',
      class: 'smallBox',
    },
    { task: 'Awaiting Feedback', imgpath: 'feedback', class: 'smallBox' },
    { task: 'Tasks Done', imgpath: 'taskdone', class: 'smallBox' },
  ];

  /**
   * Swap the position of object in the Array for mobile version
   *
   * @param index1
   * @param index2
   */
  swapTasks(index1: number, index2: number) {
    if (
      index1 >= 0 &&
      index1 < this.summaryTasks.length &&
      index2 >= 0 &&
      index2 < this.summaryTasks.length
    ) {
      [this.summaryTasks[index1], this.summaryTasks[index2]] = [
        this.summaryTasks[index2],
        this.summaryTasks[index1],
      ];
    }
  }
}
