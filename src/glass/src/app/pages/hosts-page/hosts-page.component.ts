import { Component } from '@angular/core';
import { marker as TEXT } from '@biesbjerg/ngx-translate-extract-marker';

import { DeclarativeFormModalComponent } from '~/app/core/modals/declarative-form/declarative-form-modal.component';
import { DatatableColumn } from '~/app/shared/models/datatable-column.type';
import { NodesService, TokenReply } from '~/app/shared/services/api/nodes.service';
import { Host, OrchService } from '~/app/shared/services/api/orch.service';
import { DialogService } from '~/app/shared/services/dialog.service';

import { LocalStorageService } from '~/app/shared/services/local-storage.service';


@Component({
  selector: 'glass-hosts-page',
  templateUrl: './hosts-page.component.html',
  styleUrls: ['./hosts-page.component.scss']
})
export class HostsPageComponent {
  loading = false;
  firstLoadComplete = false;
  data: Host[] = [];
  columns: DatatableColumn[];

  constructor(
    private dialogService: DialogService,
    private nodesService: NodesService,
    private orchService: OrchService,
    private localStorageService: LocalStorageService
  ) {
    this.columns = [
      {
        name: TEXT('Hostname'),
        prop: 'hostname',
        sortable: true
      },
      {
        name: TEXT('Address'),
        prop: 'address',
        sortable: true
      }
    ];
    this.loadSettings();
  }

  loadData(): void {
    this.loading = true;
    this.orchService.hosts().subscribe((data) => {
      this.data = data;
      this.loading = this.firstLoadComplete = true;
    });
  }

  onShowToken(): void {
    this.nodesService.token().subscribe((res: TokenReply) => {
      this.dialogService.open(DeclarativeFormModalComponent, undefined, {
        width: '40%',
        data: {
          title: 'Authentication Token',
          subtitle: TEXT(
            'Use this token to authenticate a new node when adding it to the cluster.'
          ),
          fields: [
            {
              type: 'text',
              name: 'token',
              value: res.token,
              readonly: true,
              hasCopyToClipboardButton: true,
              class: 'glass-text-monospaced'
            }
          ],
          okButtonVisible: false,
          cancelButtonText: TEXT('Close')
        }
      });
    });
  }
  loadSettings(): void {
    const value = this.localStorageService.get('harddrive_widgets');
    if (_.isString(value)) {
      this.gridsterItems = JSON.parse(value);
    }
    // If no widgets are configured, then show the default ones.
    if (!this.gridsterItems.length) {
      _.forEach( _.filter(this.widgets, ['enabledByDefault', true]),
        (widget: DashboardWidgetConfig) => {
	// Add ALL widgets with position (0,0), the grid will rearrange
	// them automatically.
	this.gridsterItems.push({
	  cols: widget.cols,
	  rows: widget.rows,
	  x: 0,
	  y: 0,
	  type: widget.id
	});
      });
    }
  }
}
