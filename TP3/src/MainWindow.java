import javax.swing.JFrame;

public class MainWindow {

	public static void main(String[] args) {
		JFrame mainWindow = new JFrame();
		mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainWindow.setSize(500, 500);
		
		mainWindow.add(new DrawPanel());
		
		mainWindow.setVisible(true);

	}

}
