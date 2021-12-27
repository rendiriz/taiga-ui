import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TUI_IS_CYPRESS} from '@taiga-ui/cdk';

@Component({
    selector: 'tui-tab-content',
    templateUrl: './tab-content.template.html',
    styleUrls: ['./tab-content.template.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiTabContentComponent {
    @Input() code? = '';
    @Input() animate = false;
    @Input() isPreview = false;

    constructor(@Inject(TUI_IS_CYPRESS) readonly isCypress: boolean) {}
}
