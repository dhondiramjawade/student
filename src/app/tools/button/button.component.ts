import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IconComponent } from '../icon/icon.component';

export type ButtonType = 'raised' | 'stroked' | 'flat' | 'fab' | 'mini-fab' | 'icon' | 'basic';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  /**
 * Button Theme
 */
  @Input() theme: ThemePalette = "primary";

  /**
   * Disable Button
   */
  @Input() disabled = false;

  /**
   * Button Title 
   */
  @Input() title = "";

  /**
   * Button Type
   */
  @Input() type: ButtonType = 'raised'

  /**
   * Button Value
   */
  @Input() value = ""

  /**
   * Only for icon type
   */
  @Input() iconTemplate: TemplateRef<IconComponent> | null = null;

  /**
   * Click Output Event
   */
  @Output() onclick = new EventEmitter();

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  onClick(evt: any) {
    this.onclick.emit(evt);
  }

}
