import models from "../models/index";
import BaseRepository from "./baseRepository";

class VisualizationRepository extends BaseRepository {}

export default new VisualizationRepository(models.visualizationConfig);
