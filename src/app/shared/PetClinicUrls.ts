export class PetClinicUrls {
  private static readonly BASE_PATH = 'http://localhost:8080/my-petclinic';
  private static readonly NEW = 'new';
  private static readonly EDIT = 'edit';
  private static readonly SEARCH = 'search';
  private static readonly OWNERS = 'owners';
  private static readonly PETS = 'pets';
  private static readonly VISITS = 'visits';

  static ownersPath(): string {
    return `${PetClinicUrls.BASE_PATH}/${PetClinicUrls.OWNERS}`;
  }

  static searchOwnersPath(): string {
    return `${PetClinicUrls.ownersPath()}/${PetClinicUrls.SEARCH}`;
  }

  static ownerPath(id: number): string {
    return `${PetClinicUrls.ownersPath()}/${id}`;
  }

  static editOwnerPath(id: number): string {
    return `${PetClinicUrls.ownerPath(id)}/${PetClinicUrls.EDIT}`;
  }

  static petsPath(ownerId: number): string {
    return `${PetClinicUrls.ownerPath(ownerId)}/${PetClinicUrls.PETS}`;
  }

  static petPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.petsPath(ownerId)}/${petId}`;
  }

  static editPetPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.petPath(ownerId, petId)}/${PetClinicUrls.EDIT}`;
  }

  static newPetPath(ownerId: number): string {
    return `${PetClinicUrls.petsPath(ownerId)}/${PetClinicUrls.NEW}`;
  }

  static visitsPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.petPath(ownerId, petId)}/${PetClinicUrls.VISITS}`;
  }

  static visitPath(ownerId: number, petId: number, visitId: number): string {
    return `${PetClinicUrls.visitsPath(ownerId, petId)}/${visitId}`;
  }

  static editVisitPath(ownerId: number, petId: number, visitId: number): string {
    return `${PetClinicUrls.visitPath(ownerId, petId, visitId)}/${PetClinicUrls.EDIT}`;
  }

  static newVisitPath(ownerId: number, petId: number): string {
    return `${PetClinicUrls.visitsPath(ownerId, petId)}/${PetClinicUrls.NEW}`;
  }

}

