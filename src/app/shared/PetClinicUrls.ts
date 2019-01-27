export class PetClinicUrls {
  private static readonly BASE_PATH = 'http://localhost:8080/my-petclinic';
  private static readonly NEW = 'new';

  static ownersPath(): string {
    return `${PetClinicUrls.BASE_PATH}/owners`;
  }

  static ownerSearchPath(): string {
    return `${PetClinicUrls.ownersPath()}/search`;
  }

  static ownerPath(id: number): string {
    return `${PetClinicUrls.ownersPath()}/${id}`;
  }

  static ownerEditPath(id: number): string {
    return `${PetClinicUrls.ownerPath(id)}/edit`;
  }

  static petsPath(ownerId: number): string {
    return `${PetClinicUrls.ownerPath(ownerId)}/pets`;
  }

  static petPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.petsPath(ownerId)}/${petId}`;
  }

  static newPetPath(ownerId: number): string {
    return `${PetClinicUrls.petsPath(ownerId)}/${PetClinicUrls.NEW}`;
  }

  static visitsPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.petPath(ownerId, petId)}/visits`;
  }

  static visitPath(ownerId: number, petId: number, visitId: number): string {
    return `${PetClinicUrls.visitsPath(ownerId, petId)}/${visitId}`;
  }

  static newVisitPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.visitsPath(ownerId, petId)}/${PetClinicUrls.NEW}`;
  }

}

