import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.SwingConstants;

public class MainProgram {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JFrame mainWindow = new JFrame();
		
		mainWindow.setSize(500, 500);
		
		JSlider slide = new JSlider(SwingConstants.HORIZONTAL, 0, 30, 4 );
		
		RangeSlider rangeSlide = new RangeSlider(0, 30, 0, 8);	
		
		JPanel canvas = new JPanel();
		canvas.add(rangeSlide);
		mainWindow.add(canvas);
		
		mainWindow.setVisible(true);
		
	}

}
