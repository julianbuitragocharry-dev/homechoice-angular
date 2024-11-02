import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../service/property.service';
import { UserService } from '../../../service/user.service';
import { DtoProperty } from '../../../interfaces/property/dto-property';
import { DTOAgentResponse } from '../../../interfaces/user/dtoagent-response';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  propertyId !: number;
  property !: DtoProperty;
  agent !: DTOAgentResponse;
  mapUrl !: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Get the property ID from the URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      if (id) {  
        this.propertyId = +id;
        this.fetchProperty(this.propertyId);
      }
    });
  }

  // API calls
  fetchProperty(id: number): void {
    this.propertyService.getPropertyById(id).subscribe(
      (data) => {
        this.property = data;
        this.initializeMap();
        this.fetchAgent(this.property.agent);
      }
    );
  }

  fetchAgent(agentId: number): void {
    this.userService.getAgentById(agentId).subscribe(
      (data) => {
        this.agent = data;
      }
    );
  }

  // Helper functions
  contactAgent(): void {
    const phone = this.agent.phone.replace(/\D/g, '');
    const message = `Estimado/a ${this.agent.name},

    Espero que se encuentre bien. Me dirijo a usted para expresar mi interés en la propiedad **${this.property.name}**. ¿Sería posible agendar una cita para discutir más sobre esta propiedad y obtener más información?

    Agradezco de antemano su atención y quedo a la espera de su respuesta.

    Saludos cordiales,  
    [Su Nombre]`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  initializeMap(): void {
    if (this.property.latitude && this.property.longitude) {
      const url = `https://maps.google.com/maps?q=${this.property.latitude},${this.property.longitude}&hl=es&z=15&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
