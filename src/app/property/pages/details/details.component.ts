import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../service/property.service';
import { AgentService } from '../../../service/agent.service';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { DTOAgentResponse } from '../../../interfaces/agent/dto-agent-response';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    CarouselComponent,
    TranslateModule
  ],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  //#region variables
  propertyId !: number;
  property !: DtoProperty;
  agent !: DTOAgentResponse;
  mapUrl !: SafeResourceUrl;
  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private agentService: AgentService,
    private sanitizer: DomSanitizer,
    private languageService: LanguageService
  ) {
    const lang = this.languageService.getCurrentLanguage(); 
    this.languageService.setLanguage(lang);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      if (id) {  
        this.propertyId = +id;
        this.loadProperty(this.propertyId);
      }
    });
  }

  //#region api calls
  loadProperty(id: number): void {
    this.propertyService.getPropertyById(id).subscribe({
      next: (data: DtoProperty) => {
        this.property = data;
        this.initializeMap();
        this.loadAgent(this.property.agent);
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  loadAgent(agentId: number): void {
    this.agentService.getAgentById(agentId).subscribe({
      next: (data) => {
        this.agent = data;
      }
    });
  }
  //#endregion

  //#region methods
  contactAgent(): void {
    const phone = this.agent.phone.replace(/\D/g, '');
    const message = `Estimado/a ${this.agent.name},

    Espero que se encuentre bien. Me dirijo a usted para expresar mi interés en la propiedad **${this.property.name}**. ¿Sería posible agendar una cita para discutir más sobre esta propiedad y obtener más información?

    Agradezco de antemano su atención y quedo a la espera de su respuesta.

    Saludos cordiales,
    [Su Nombre]`;
    const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  initializeMap(): void {
    if (this.property.latitude && this.property.longitude) {
      const url = `https://maps.google.com/maps?q=${this.property.latitude},${this.property.longitude}&hl=es&z=15&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
  //#endregion
}
